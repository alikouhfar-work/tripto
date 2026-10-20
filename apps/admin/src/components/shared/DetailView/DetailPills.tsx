import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type DetailPillsProps = {
  items: ReactNode[];
  emptyText?: string;
  className?: string;
  pillClassName?: string;
};

/** Inline pill list for detail rows (amenities, policies, seasons...). */
export const DetailPills = ({ items, emptyText = '—', className, pillClassName }: DetailPillsProps) => {
  if (!items.length) return <span className="text-muted-foreground">{emptyText}</span>;

  return (
    <ul className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className={cn(
            'inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground',
            pillClassName,
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
