import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

type DataTableSkeletonProps = {
  columnCount?: number;
  rowCount?: number;
  showActionColumn?: boolean;
  showIndexColumn?: boolean;
  /** Zero-based index of the image column (renders a responsive block mirroring DataTableImageCell). */
  imageColumn?: number;
  className?: string;
};

/**
 * Loading skeleton mirroring the DataTable layout 1:1 (same Table
 * primitives, cell spacing, toolbar, and footer structure) so the resolved
 * table replaces it without layout shift.
 * Used by per-route `loading.tsx` files so every table navigation
 * (pagination, sort, filter) shows a proper skeleton instead of a blank page.
 */
export const DataTableSkeleton = ({
  columnCount = 5,
  rowCount = 10,
  showActionColumn = true,
  showIndexColumn = true,
  imageColumn,
  className,
}: DataTableSkeletonProps) => {
  const dataColumns = Array.from({ length: columnCount });
  const rows = Array.from({ length: rowCount });

  return (
    <div className={cn('space-y-4', className)} aria-busy="true" aria-label="Loading table">
      {/* Toolbar skeleton: search input + button, create button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Skeleton className="h-10 w-full rounded-lg sm:w-56" />
          <Skeleton className="h-10 w-full rounded-lg sm:w-20" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg sm:w-24" />
      </div>

      {/* Table skeleton: same structure + spacing as DataTable */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-none dark:shadow-sm">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-muted/60 hover:bg-muted/60 dark:bg-muted/20 dark:hover:bg-muted/20">
              {showIndexColumn && (
                <TableHead className="w-14 border-e border-border px-4 py-3">
                  <Skeleton className="mx-auto h-5 w-6" />
                </TableHead>
              )}
              {dataColumns.map((_, i) => (
                <TableHead
                  key={i}
                  className="border-e border-border px-4 py-3 whitespace-nowrap last:border-e-0"
                >
                  <Skeleton className="h-5" style={{ maxWidth: `${140 - i * 8}px` }} />
                </TableHead>
              ))}
              {showActionColumn && (
                <TableHead className="w-[1%] px-4 py-3 whitespace-nowrap">
                  <Skeleton className="mx-auto h-5 w-16" />
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((_, r) => (
              <TableRow
                key={r}
                className="border-b border-border last:border-b-0 hover:bg-muted/40 dark:hover:bg-muted/20"
              >
                {showIndexColumn && (
                  <TableCell className="w-14 border-e border-border/60">
                    <Skeleton className="mx-auto h-5 w-6" />
                  </TableCell>
                )}
{dataColumns.map((_, i) => (
                      <TableCell
                        key={i}
                        className="border-e border-border/60 px-4 py-3 last:border-e-0"
                      >
                        {imageColumn === i ? (
                          <Skeleton className="h-14 w-16 shrink-0 rounded-md sm:h-16 sm:w-24 sm:rounded-sm" />
                        ) : (
                      <Skeleton
                        className="h-5"
                        style={{
                          maxWidth: `${180 - ((r + i) % 4) * 30}px`,
                          opacity: 1 - r * 0.05,
                        }}
                      />
                    )}
                  </TableCell>
                ))}
                {showActionColumn && (
                  <TableCell className="w-[1%] px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                      <Skeleton className="size-7 rounded-md sm:size-8" />
                      <Skeleton className="size-7 rounded-md sm:size-8" />
                      <Skeleton className="size-7 rounded-md sm:size-8" />
                      <Skeleton className="hidden size-8 rounded-md min-[480px]:block" />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer skeleton: range text + rows selector + pagination */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-5 w-full max-w-64" />
        <div className="flex max-w-full flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
          <div className="flex max-w-full items-center gap-1 overflow-x-auto pb-1">
            <Skeleton className="h-9 w-16 shrink-0 rounded-lg sm:w-20" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-9 min-w-9 shrink-0 rounded-lg ${i >= 3 ? 'hidden sm:block' : ''}`}
              />
            ))}
            <Skeleton className="h-9 w-16 shrink-0 rounded-lg sm:w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
