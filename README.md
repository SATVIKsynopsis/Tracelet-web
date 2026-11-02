# tracelet-web

Landing page and documentation for [Tracelet](https://github.com/SATVIKsynopsis/Tracelet), the `otel-test`
integration testing tool for OpenTelemetry Collector configurations.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Fumadocs (MDX) and Lucide icons.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
npm start
```

`NEXT_PUBLIC_SITE_URL` sets the canonical URL used in metadata, Open Graph images, `sitemap.xml` and
`robots.txt`. It defaults to `http://localhost:3000`.

## Layout

```text
app/
  (home)/            landing page and its layout (header, footer)
  docs/              Fumadocs layout and page renderer
  api/search/        Orama search index (built from the docs)
  og/docs/           Open Graph images for docs pages
  opengraph-image.tsx, icon.svg, sitemap.ts, robots.ts
components/
  home/              landing page sections
  site/              header, footer, logo, copy button, install command
  mdx.tsx            MDX components available in docs
content/docs/        documentation (MDX + meta.json navigation)
lib/
  site.ts            version, repository and install constants
  examples.ts        the five real-world examples shown on the landing page
```

## Content sources

The documentation is derived from the Tracelet source at `v0.1.0`. Command output on the site was captured from
the published `otel-test` v0.1.0 binary. The example pages (`content/docs/examples/*.mdx`) embed
`collector.yaml`, `otel-test.yaml`, fixtures and regression patches verbatim from
`examples/real-world` in the Tracelet repository. When the examples change, update those pages.

When a new Tracelet release ships, update `lib/site.ts` and the version strings in `content/docs`.
