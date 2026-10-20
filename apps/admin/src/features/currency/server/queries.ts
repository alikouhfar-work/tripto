'use server';

import { prisma } from '@repo/database';
import type { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import type { Currency } from '@repo/database';
import { CURRENCY_ERRORS } from '@/features/currency/constants';
import { toTableQuery } from '@/server/table-params';

const ALLOWED = ['title', 'isoCode', 'symbol', 'createdAt', 'updatedAt'] as const;

export const getCurrencies = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<Currency>> => {
  try {
    const { filter } = params;
    const { skip, take, orderBy } = toTableQuery(params, ALLOWED);

    const where = filter
      ? {
          OR: [
            { title: { contains: filter, mode: 'insensitive' as const } },
            { symbol: { contains: filter, mode: 'insensitive' as const } },
            { isoCode: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.currency.findMany({ where, orderBy, skip, take }),
      prisma.currency.count({ where }),
    ]);

    return { data, total };
  } catch {
    throw new Error(CURRENCY_ERRORS.GET_LIST_FAILED);
  }
};

export const getCurrency = async (
  id: string,
): Promise<Currency & { activityCount: number; houseCount: number; roomCount: number }> => {
  try {
    const currency = await prisma.currency.findUnique({
      where: { id },
      include: { _count: { select: { activities: true, houses: true, rooms: true } } },
    });
    if (!currency) throw new Error(CURRENCY_ERRORS.NOT_FOUND);
    return {
      ...currency,
      activityCount: currency._count.activities,
      houseCount: currency._count.houses,
      roomCount: currency._count.rooms,
    };
  } catch (error) {
    if (error instanceof Error && error.message === CURRENCY_ERRORS.NOT_FOUND) throw error;
    throw new Error(CURRENCY_ERRORS.GET_FAILED);
  }
};

export const getCurrenciesDropdown = async (
  onlyActive = true,
): Promise<{ value: string; label: string }[]> => {
  const currencies = await prisma.currency.findMany({
    where: onlyActive ? { isActive: true } : {},
    orderBy: { title: 'asc' },
    select: { id: true, title: true, isoCode: true },
  });

  return currencies.map((currency) => ({
    value: currency.id,
    label: `${currency.isoCode} • ${currency.title}`,
  }));
};
