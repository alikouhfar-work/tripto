import { CheckIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Plain-text fallback for nullable detail values. */
export const detailText = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return '—';
  if (value instanceof Date) return formatDetailDate(value);
  return String(value);
};

export const formatDetailDate = (value: Date | string): string => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
};

/** Readonly boolean badge for detail views. */
export const DetailBoolean = ({ value, trueLabel = 'Yes', falseLabel = 'No' }: { value: boolean; trueLabel?: string; falseLabel?: string }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
      value
        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400'
        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-500/15 dark:text-zinc-400',
    )}
  >
    {value ? <CheckIcon size={13} /> : <XIcon size={13} />}
    {value ? trueLabel : falseLabel}
  </span>
);
