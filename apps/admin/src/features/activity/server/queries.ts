'use server';

import { prisma } from '@repo/database';
import type {
  ServerTableParams,
  ServerTableResponse,
} from '@/components/shared/DataTable/types';
import { toTableQuery } from '@/server/table-params';
import { ACTIVITY_ERRORS } from '@/features/activity/constants';
import type { ActivityColumnDTO, ActivityDTO } from '@/features/activity/types/activity';

const ACTIVITY_SORT_KEYS = [
  'title',
  'country',
  'countryCode',
  'city',
  'price',
  'discount',
  'isActive',
  'createdAt',
  'updatedAt',
] as const;

export const getActivities = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<ActivityColumnDTO>> => {
  try {
    // Pagination/sort clamped + whitelisted (pageSize capped, page floored).
    const { skip, take, orderBy } = toTableQuery(params, ACTIVITY_SORT_KEYS);
    const q = params.filter.trim().slice(0, 100);

    const numericFilter = Number(q);
    const isNumeric = q !== '' && !Number.isNaN(numericFilter);

    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' as const } },
            { country: { contains: q, mode: 'insensitive' as const } },
            { city: { contains: q, mode: 'insensitive' as const } },
            {
              activityType: {
                title: { contains: q, mode: 'insensitive' as const },
              },
            },
            ...(isNumeric
              ? [{ price: { equals: numericFilter } }, { discount: { equals: numericFilter } }]
              : []),
          ],
        }
      : {};

    const [rows, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          currency: true,
          activityType: true,
        },
      }),
      prisma.activity.count({ where }),
    ]);

    return { data: rows as unknown as ActivityColumnDTO[], total };
  } catch {
    throw new Error(ACTIVITY_ERRORS.GET_LIST_FAILED);
  }
};

export const getActivity = async (id: string): Promise<ActivityDTO> => {
  const activity = await prisma.activity.findUnique({
    where: { id },
    include: { currency: true, activityType: true },
  });

  if (!activity) throw new Error(ACTIVITY_ERRORS.NOT_FOUND);

  return activity as unknown as ActivityDTO;
};
