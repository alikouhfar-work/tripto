import type { ReactNode } from 'react';
import type { ServerTableParams, ServerTableResponse } from './types';

export type { ServerTableParams, ServerTableResponse };

/** Server-friendly column definition (no TanStack dependency). */
export type TableColumn<T> = {
  /** Stable id; also the default accessor path + sort field. */
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
};

/** Raw URL search params as received by Next.js pages. */
export type TableSearchParams = Record<string, string | string[] | undefined>;

export type DataTableProps<T extends { id: string }> = {
  entityName: string;
  columns: TableColumn<T>[];
  query: (params: ServerTableParams) => Promise<ServerTableResponse<T>>;
  deleteAction?: (id: string) => Promise<unknown>;
  /** Flip active/inactive state; rendered only for rows carrying a boolean `isActive`. */
  toggleActiveAction?: (id: string) => Promise<unknown>;
  searchParams: TableSearchParams | Promise<TableSearchParams>;
  defaultSort?: { id: string; desc: boolean };
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  showActionColumn?: boolean;
  showCreateButton?: boolean;
  /** Show a leading row-number column (accounts for pagination offset). Defaults to true. */
  showIndexColumn?: boolean;
  /** Show the readonly view button (links to `/{entityName}/{id}`). Defaults to true. */
  showViewButton?: boolean;
  /** Show the active/inactive toggle button (needs `toggleActiveAction`). Defaults to true. */
  showToggleActiveButton?: boolean;
  /**
   * Extra per-row actions rendered first inside the actions cell (before the
   * built-in view/edit buttons). Return `null` to render nothing for a row.
   */
  extraActions?: (row: T) => ReactNode;
};
