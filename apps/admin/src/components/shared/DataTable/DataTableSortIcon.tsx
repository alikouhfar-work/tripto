import { IconArrowDown, IconArrowUp, IconArrowsUpDown } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

type SortState = 'asc' | 'desc' | 'none';

/**
 * Sort indicator for DataTable headers.
 * - asc/desc: filled arrow in brand color, always visible.
 * - none: muted up-down icon, revealed on header hover so users discover sortability.
 */
export const DataTableSortIcon = ({ state }: { state: SortState }) => {
  if (state === 'asc') {
    return <IconArrowUp size={15} strokeWidth={2.5} className="shrink-0 text-blue-600 dark:text-blue-400" aria-label="Sorted ascending" />;
  }
  if (state === 'desc') {
    return <IconArrowDown size={15} strokeWidth={2.5} className="shrink-0 text-blue-600 dark:text-blue-400" aria-label="Sorted descending" />;
  }
  return (
    <IconArrowsUpDown
      size={15}
      className={cn(
        'shrink-0 text-zinc-300 opacity-0 transition-opacity group-hover/sort:opacity-100 dark:text-zinc-600',
      )}
      aria-hidden
    />
  );
};
