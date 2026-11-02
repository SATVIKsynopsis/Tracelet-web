import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = 'Tracelet: test your telemetry pipelines';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0b0b0a',
          color: '#edebe6',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 40 }}>
            <div style={{ width: 22, height: 6, borderRadius: 3, background: 'rgba(237,235,230,0.45)' }} />
            <div style={{ width: 20, height: 6, borderRadius: 3, marginLeft: 8, background: 'rgba(237,235,230,0.75)' }} />
            <div style={{ width: 22, height: 6, borderRadius: 3, marginLeft: 18, background: '#f59e3b' }} />
          </div>
          Tracelet
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>
            Test your telemetry pipelines.
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#8d8b85' }}>
            Integration tests for OpenTelemetry Collector configurations
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 24, color: '#5f5d58', fontFamily: 'monospace' }}>
          <span>{site.binary} {site.version}</span>
          <span>·</span>
          <span>otelcol-contrib {site.collectorVersion}</span>
        </div>
      </div>
    ),
    size,
  );
}
