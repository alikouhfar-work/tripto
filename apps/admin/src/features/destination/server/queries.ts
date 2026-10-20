'use server';

import { prisma } from '@repo/database';
import type {
  ServerTableParams,
  ServerTableResponse,
} from '@/components/shared/DataTable/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { toTableQuery } from '@/server/table-params';
import type { Destination } from '@/features/destination/types/destination';

const ALLOWED = ['city', 'country', 'slogan', 'createdAt', 'updatedAt'] as const;

export const getDestinations = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<Destination>> => {
  try {
    const { filter } = params;
    const { skip, take, orderBy } = toTableQuery(params, ALLOWED);

    const where = filter
      ? {
          OR: [
            { city: { contains: filter, mode: 'insensitive' as const } },
            { slogan: { contains: filter, mode: 'insensitive' as const } },
            { country: { contains: filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.destination.findMany({ where, orderBy, skip, take }),
      prisma.destination.count({ where }),
    ]);

    return { data: data as unknown as Destination[], total };
  } catch {
    throw new Error(DESTINATION_ERRORS.GET_LIST_FAILED);
  }
};

export const getDestination = async (id: string): Promise<Destination> => {
  const destination = await prisma.destination.findUnique({
    where: { id },
    include: {
      _count: { select: { accommodations: true } },
      accommodations: {
        select: { id: true, title: true },
        orderBy: { title: 'asc' },
      },
    },
  });
  if (!destination) throw new Error(DESTINATION_ERRORS.NOT_FOUND);
  return {
    ...destination,
    accommodationCount: destination._count.accommodations,
    accommodations: destination.accommodations,
  } as unknown as Destination;
};
