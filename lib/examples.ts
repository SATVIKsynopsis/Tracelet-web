import { repoPath } from './site';

export interface Example {
  slug: string;
  dir: string;
  title: string;
  summary: string;
  components: string[];
  tests: number;
  regressions: number;
  catches: string;
}

export const examples: Example[] = [
  {
    slug: 'pii-redaction',
    dir: '01-pii-redaction',
    title: 'PII redaction',
    summary:
      'A payment gateway applies an attribute allowlist and masks card numbers and e-mail addresses, even on allowed keys.',
    components: ['redaction', 'memory_limiter', 'batch'],
    tests: 3,
    regressions: 2,
    catches: 'user.password added to allowed_keys "for debugging"',
  },
  {
    slug: 'tenant-routing',
    dir: '02-tenant-routing',
    title: 'Tenant routing',
    summary:
      "Each tenant's spans reach only that tenant's backend. Unknown tenants go to a shared topic. Errors are also copied to alerting.",
    components: ['routing', 'forward', 'filter'],
    tests: 5,
    regressions: 3,
    catches: 'a copy-pasted routing rule sending globex spans to acme',
  },
  {
    slug: 'sampling-filtering',
    dir: '03-sampling-filtering',
    title: 'Sampling and filtering',
    summary:
      'Probe traffic is dropped first, then tail sampling keeps errors, slow requests and enterprise customers.',
    components: ['filter', 'tail_sampling'],
    tests: 6,
    regressions: 4,
    catches: 'an always_sample policy quietly added as a baseline',
  },
  {
    slug: 'metrics-transform',
    dir: '04-metrics-transform',
    title: 'Metrics transformation',
    summary:
      'Legacy semantic conventions are renamed, user.id is aggregated away, runtime noise is dropped and the environment is stamped.',
    components: ['transform', 'metrics_transform', 'filter', 'resource'],
    tests: 5,
    regressions: 4,
    catches: 'aggregation moved before the rename, which loses a series',
  },
  {
    slug: 'log-redaction',
    dir: '05-log-redaction',
    title: 'Log redaction',
    summary:
      'Secrets are removed from JSON log bodies and attributes, user IDs are hashed and client IPs truncated to /24.',
    components: ['transform (OTTL)', 'filter'],
    tests: 6,
    regressions: 4,
    catches: 'secret deletion moved before JSON parsing',
  },
];

export function exampleSource(e: Example): string {
  return repoPath(`examples/real-world/${e.dir}`);
}
