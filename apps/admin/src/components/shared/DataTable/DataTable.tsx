import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconPencil,
  IconPlus,
  IconPower,
  IconSearch,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { ButtonPrimary } from '../ButtonPrimary';
import { DataTableSortIcon } from './DataTableSortIcon';
import { DeleteRowDialog } from './DeleteRowDialog';
import { ToggleActiveDialog } from './ToggleActiveDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { DataTableProps, TableSearchParams } from './table';

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

const getPath = (row: unknown, path: string): unknown =>
  path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, row);

/** Boolean `isActive` of a row, or `undefined` when the row carries none. */
const rowIsActive = (row: unknown): boolean | undefined => {
  const value = getPath(row, 'isActive');
  return typeof value === 'boolean' ? value : undefined;
};

const hrefWith = (
  entityName: string,
  base: Record<string, string>,
  overrides: Record<string, string | undefined>,
): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries({ ...base, ...overrides })) {
    if (value !== undefined && value !== '') params.set(key, value);
  }
  const query = params.toString();
  return query ? `/${entityName}?${query}` : `/${entityName}`;
};

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

/** Compact page window: first, last, neighbours of current, ellipsis for gaps. */
const pageItems = (page: number, totalPages: number): PageItem[] => {
  const keep = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...keep].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  const items: PageItem[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) items.push(prev === 1 ? 'ellipsis-start' : 'ellipsis-end');
    items.push(p);
    prev = p;
  }
  return items;
};

export const DataTable = async <T extends { id: string }>({
  entityName,
  columns,
  query,
  deleteAction,
  toggleActiveAction,
  searchParams,
  defaultSort = { id: 'createdAt', desc: false },
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  showActionColumn = true,
  showCreateButton = true,
  showIndexColumn = true,
  showViewButton = true,
  showToggleActiveButton = true,
  extraActions,
}: DataTableProps<T>) => {
  const params: TableSearchParams = await searchParams;
  const page = Math.max(1, Number(first(params.page)) || 1);
  const pageSize = Number(first(params.pageSize)) || defaultPageSize;
  const filter = first(params.q) ?? '';
  const sortBy = first(params.sortBy) || defaultSort.id;
  const sortOrder = first(params.sortOrder) === 'desc' ? 'desc' : 'asc';

  const { data: rows, total } = await query({
    page,
    pageSize,
    filter,
    sort: [{ id: sortBy, desc: sortOrder === 'desc' }],
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const base = {
    q: filter,
    pageSize: String(pageSize),
    sortBy,
    sortOrder,
  };
  const colSpan = columns.length + (showActionColumn ? 1 : 0) + (showIndexColumn ? 1 : 0);
  const rangeFrom = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const rangeTo = Math.min(safePage * pageSize, total);

  const sortHref = (key: string) =>
    hrefWith(entityName, base, {
      sortBy: key,
      sortOrder: sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc',
      page: undefined,
    });

  const prevHref = hrefWith(entityName, base, {
    page: safePage <= 2 ? undefined : String(safePage - 1),
  });
  const nextHref = hrefWith(entityName, base, { page: String(safePage + 1) });

  return (
    <div className="space-y-4">
      {/* Toolbar: search + create */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form
          method="GET"
          action={`/${entityName}`}
          className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row"
          role="search"
        >
          <input type="hidden" name="pageSize" value={pageSize} />
          <input type="hidden" name="sortBy" value={sortBy} />
          <input type="hidden" name="sortOrder" value={sortOrder} />
          <div className="relative w-full sm:w-auto">
            <IconSearch
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />
            <input
              name="q"
              defaultValue={filter}
              placeholder="Search..."
              aria-label="Search"
              className="h-10 w-full rounded-lg border border-border bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none sm:w-56"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="h-10 cursor-pointer rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              Search
            </button>
            {filter && (
              <Link
                href={hrefWith(entityName, { pageSize: String(pageSize), sortBy, sortOrder }, {})}
                aria-label="Clear search"
                className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <IconX size={15} />
                Clear
              </Link>
            )}
          </div>
        </form>

        {showCreateButton && (
          <Link
            href={`/${entityName}/new`}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:justify-start dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <IconPlus size={16} />
            Create
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-none dark:shadow-sm">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-muted/60 hover:bg-muted/60 dark:bg-muted/20 dark:hover:bg-muted/20">
              {showIndexColumn && (
                <TableHead className="w-14 border-e border-border px-4 py-3 text-center font-semibold text-muted-foreground tabular-nums">
                  #
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="border-e border-border px-4 py-3 font-semibold whitespace-nowrap last:border-e-0"
                >
                  {column.sortable === false ? (
                    <span className="text-foreground">{column.header}</span>
                  ) : (
                    <Link
                      href={sortHref(column.key)}
                      className="group/sort inline-flex items-center gap-1.5 text-foreground hover:text-blue-600 dark:hover:text-blue-400"
                      aria-label={`Sort by ${column.header} ${sortBy === column.key && sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                    >
                      <span>{column.header}</span>
                      <DataTableSortIcon
                        state={
                          sortBy === column.key ? (sortOrder as 'asc' | 'desc') : 'none'
                        }
                      />
                    </Link>
                  )}
                </TableHead>
              ))}
              {showActionColumn && (
                <TableHead className="w-[1%] px-4 py-3 text-center font-semibold whitespace-nowrap text-muted-foreground">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length ? (
              rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  className="border-b border-border transition-colors last:border-b-0 hover:bg-muted/40 dark:hover:bg-muted/20"
                >
                  {showIndexColumn && (
                    <TableCell className="w-14 border-e border-border/60 text-center text-xs text-muted-foreground tabular-nums">
                      {(safePage - 1) * pageSize + rowIndex + 1}
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className="border-e border-border/60 px-4 py-3 last:border-e-0"
                    >
                      {column.render ? column.render(row) : String(getPath(row, column.key) ?? '')}
                    </TableCell>
                  ))}
                  {showActionColumn && (
                    <TableCell className="w-[1%] px-2 py-2 whitespace-nowrap">
                      <TooltipProvider>
                        <div className="flex items-center justify-center gap-1.5">
                          {extraActions?.(row)}
                          {showViewButton && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  href={`/${entityName}/${row.id}`}
                                  aria-label="View details"
                                >
                                  <ButtonPrimary color="teal" size="icon" tone="solid">
                                    <IconEye size={16} />
                                  </ButtonPrimary>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>View details</TooltipContent>
                            </Tooltip>
                          )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={`/${entityName}/${row.id}/edit`} aria-label="Edit">
                                <ButtonPrimary color="sky" size="icon" tone="solid">
                                  <IconPencil size={16} />
                                </ButtonPrimary>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>Edit</TooltipContent>
                          </Tooltip>
                          {showToggleActiveButton &&
                            toggleActiveAction &&
                            rowIsActive(row) !== undefined && (
                              <Tooltip>
                                <ToggleActiveDialog
                                  action={toggleActiveAction.bind(null, row.id)}
                                  isActive={rowIsActive(row) === true}
                                >
                                  <TooltipTrigger asChild>
                                    <span>
                                      <ButtonPrimary
                                        color={rowIsActive(row) === true ? 'yellow' : 'green'}
                                        size="icon"
                                        tone="solid"
                                      >
                                        <IconPower size={16} />
                                      </ButtonPrimary>
                                    </span>
                                  </TooltipTrigger>
                                </ToggleActiveDialog>
                                <TooltipContent>
                                  {rowIsActive(row) === true ? 'Deactivate' : 'Activate'}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          {deleteAction && (
                            <Tooltip>
                              <DeleteRowDialog action={deleteAction.bind(null, row.id)}>
                                <TooltipTrigger asChild>
                                  <span>
                                    <ButtonPrimary color="red" size="icon" tone="solid">
                                      <IconTrash size={16} />
                                    </ButtonPrimary>
                                  </span>
                                </TooltipTrigger>
                              </DeleteRowDialog>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={colSpan} className="h-24 text-center text-muted-foreground">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer: range + pagination + page size */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-muted-foreground tabular-nums">
          Showing <span className="font-semibold text-foreground">{rangeFrom}–{rangeTo}</span> of{' '}
          <span className="font-semibold text-foreground">{total}</span> result
          {total === 1 ? '' : 's'}
          <span className="mx-1.5 text-border">·</span>
          page <span className="font-semibold text-foreground">{safePage}</span> of{' '}
          <span className="font-semibold text-foreground">{totalPages}</span>
        </p>

        <div className="flex max-w-full flex-wrap items-center gap-x-4 gap-y-3">
          {/* Page-size selector */}
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-muted-foreground">Rows:</span>
            <div
              className="flex items-center rounded-lg border border-border bg-card p-0.5"
              role="group"
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((size) => (
                <Link
                  key={size}
                  href={hrefWith(entityName, base, {
                    pageSize: String(size),
                    page: undefined,
                  })}
                  aria-current={size === pageSize ? 'true' : undefined}
                  className={clsx(
                    'rounded-md px-2.5 py-1 text-[13px] tabular-nums transition-colors',
                    size === pageSize
                      ? 'bg-zinc-900 font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {size}
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <nav
            className="flex max-w-full items-center gap-1 overflow-x-auto pb-1"
            aria-label="Pagination"
          >
            {safePage > 1 ? (
              <Link
                href={prevHref}
                aria-label="Go to previous page"
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <IconChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-sm text-muted-foreground opacity-50"
              >
                <IconChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
              </span>
            )}

            <div className="hidden items-center gap-1 min-[480px]:flex">
              {pageItems(safePage, totalPages).map((item) =>
                typeof item === 'number' ? (
                  <Link
                    key={item}
                    href={hrefWith(entityName, base, {
                      page: item === 1 ? undefined : String(item),
                    })}
                    aria-current={item === safePage ? 'page' : undefined}
                    aria-label={`Go to page ${item}`}
                    className={clsx(
                      'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm tabular-nums transition-colors',
                      item === safePage
                        ? 'border-blue-600 bg-blue-600 font-semibold text-white dark:border-blue-500 dark:bg-blue-600'
                        : 'border-border bg-card text-foreground hover:bg-muted',
                    )}
                  >
                    {item}
                  </Link>
                ) : (
                  <span
                    key={item}
                    aria-hidden
                    className="inline-flex h-9 min-w-6 items-center justify-center text-sm text-muted-foreground"
                  >
                    …
                  </span>
                ),
              )}
            </div>

            {safePage < totalPages ? (
              <Link
                href={nextHref}
                aria-label="Go to next page"
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <span className="hidden sm:inline">Next</span>
                <IconChevronRight size={16} />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex h-9 cursor-not-allowed items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-sm text-muted-foreground opacity-50"
              >
                <span className="hidden sm:inline">Next</span>
                <IconChevronRight size={16} />
              </span>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
