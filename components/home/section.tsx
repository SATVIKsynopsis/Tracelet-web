import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-16 border-t border-line', className)}
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ember md:col-span-3 md:pt-3">
        {eyebrow}
      </p>
      <div className="md:col-span-9">
        <h2
          id={id}
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl md:text-6xl"
        >
          {title}
        </h2>
        {children ? (
          <div className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mute">{children}</div>
        ) : null}
      </div>
    </div>
  );
}
