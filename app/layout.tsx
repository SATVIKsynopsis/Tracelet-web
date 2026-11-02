import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { site } from '@/lib/site';
import './global.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Tracelet: test your OpenTelemetry Collector pipelines',
    template: '%s | Tracelet',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'OpenTelemetry',
    'OpenTelemetry Collector',
    'otelcol',
    'integration testing',
    'telemetry pipelines',
    'PII redaction',
    'OTTL',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Tracelet: test your telemetry pipelines',
    description: site.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tracelet: test your telemetry pipelines',
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0a',
  colorScheme: 'dark',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider
          theme={{ forcedTheme: 'dark', defaultTheme: 'dark', enableSystem: false }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
