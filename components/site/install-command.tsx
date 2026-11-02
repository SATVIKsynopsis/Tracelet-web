import { installCommand } from '@/lib/site';
import { cn } from '@/lib/cn';
import { CopyButton } from './copy-button';

export function InstallCommand({
  command = installCommand,
  className,
}: {
  command?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border border-line bg-sunken py-1.5 pl-4 pr-1.5 font-mono text-[13px]',
        className,
      )}
    >
      <span className="select-none text-ember" aria-hidden="true">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-1.5 text-ink [scrollbar-width:none]">
        {command}
      </code>
      <CopyButton value={command} label="Copy install command" />
    </div>
  );
}
