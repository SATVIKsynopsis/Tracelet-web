import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Wordmark } from '@/components/site/logo';
import { repo, site } from './site';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Wordmark />,
      url: '/',
    },
    githubUrl: repo.url,
    themeSwitch: { enabled: false },
    links: [
      { text: 'Home', url: '/' },
      { text: `Releases (${site.version})`, url: repo.releases, external: true },
    ],
  };
}
