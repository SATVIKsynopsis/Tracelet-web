export const site = {
  name: 'Tracelet',
  binary: 'otel-test',
  version: 'v0.1.0',
  collectorVersion: 'v0.164.0',
  description:
    'Integration tests for OpenTelemetry Collector configurations. Tracelet runs the real Collector, injects your fixtures and checks what reaches each exporter.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  license: 'Apache-2.0',
} as const;

export const repo = {
  owner: 'SATVIKsynopsis',
  name: 'Tracelet',
  branch: 'main',
  url: 'https://github.com/SATVIKsynopsis/Tracelet',
  releases: 'https://github.com/SATVIKsynopsis/Tracelet/releases',
  release: 'https://github.com/SATVIKsynopsis/Tracelet/releases/tag/v0.1.0',
  license: 'https://github.com/SATVIKsynopsis/Tracelet/blob/main/LICENSE',
} as const;

export function repoPath(path: string): string {
  return `${repo.url}/tree/${repo.branch}/${path}`;
}

export const installCommand =
  'curl -fsSL https://github.com/SATVIKsynopsis/Tracelet/releases/latest/download/install.sh | sh';
