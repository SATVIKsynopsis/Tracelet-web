export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="4" width="11" height="3" rx="1.5" fill="currentColor" opacity="0.45" />
      <rect x="6" y="10.5" width="10" height="3" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="11" y="17" width="11" height="3" rx="1.5" fill="#f59e3b" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold tracking-tight text-ink">
      <LogoMark className="size-5" />
      <span className="text-[15px]">Tracelet</span>
    </span>
  );
}
