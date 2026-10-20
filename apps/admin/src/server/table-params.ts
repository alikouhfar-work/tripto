import type { ServerTableParams } from '@/components/shared/DataTable/types';

/**
 * Shared table-query guard: clamps pagination and whitelists sort fields.
 * Every list query must route user-controlled sort/page through here —
 * raw `{ [sortId]: order }` lets crafted sort ids hit Prisma (DoS/500).
 */
export const toTableQuery = (
  params: ServerTableParams,
  allowedSort: readonly string[],
  fallbackSortId = 'createdAt',
  maxTake = 100,
) => {
  const page =
    Number.isFinite(params.page) && params.page > 0 ? Math.floor(params.page) : 1;
  const rawTake = Number.isFinite(params.pageSize) ? Math.floor(params.pageSize) : 10;
  const take = Math.min(Math.max(rawTake, 1), maxTake);

  const sort = params.sort?.[0];
  const sortBy = sort && allowedSort.includes(sort.id) ? sort.id : fallbackSortId;
  const sortOrder = sort?.desc ? 'desc' : 'asc';

  return {
    page,
    take,
    skip: (page - 1) * take,
    orderBy: { [sortBy]: sortOrder } as Record<string, 'asc' | 'desc'>,
  };
};
