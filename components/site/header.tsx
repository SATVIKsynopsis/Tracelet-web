'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { repo, site } from '@/lib/site';
import { GithubIcon } from './github-icon';
import { Wordmark } from './logo';

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/docs', label: 'Documentation' },
  { href: '/docs/examples', label: 'Examples' },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Tracelet home" className="rounded-sm">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-mute transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={repo.url}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-mute transition-colors hover:text-ink"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
          <Link
            href="/#install"
            className="ml-2 rounded-md bg-ink px-3.5 py-1.5 text-sm font-medium text-canvas transition-colors hover:bg-white"
          >
            Install {site.version}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-md text-mute hover:text-ink md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-canvas px-5 pb-6 pt-2 md:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3.5 text-base text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={repo.url} className="flex items-center gap-2 border-b border-line py-3.5 text-base text-ink">
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </li>
        </ul>
        <Link
          href="/#install"
          onClick={() => setOpen(false)}
          className="mt-5 flex justify-center rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-canvas"
        >
          Install {site.version}
        </Link>
      </nav>
    </header>
  );
}
