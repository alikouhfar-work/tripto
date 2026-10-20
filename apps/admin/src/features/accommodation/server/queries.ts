'use server';

import { prisma } from '@repo/database';
import type { ServerTableParams, ServerTableResponse } from '@/components/shared/DataTable/types';
import { toTableQuery } from '@/server/table-params';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import type {
  AccommodationColumns,
  AccommodationDetails,
  AccommodationType,
} from '@/features/accommodation/types/accommodation';

const SORT_KEYS = [
  'title',
  'country',
  'countryCode',
  'city',
  'createdAt',
  'updatedAt',
  'favoriteCount',
] as const;

export const getAccommodations = async (
  params: ServerTableParams,
): Promise<ServerTableResponse<AccommodationColumns>> => {
  try {
    // Pagination/sort clamped + whitelisted (pageSize capped, page floored).
    const { skip, take, orderBy } = toTableQuery(params, SORT_KEYS);
    const q = params.filter.trim().slice(0, 100);

    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' as const } },
            { country: { contains: q, mode: 'insensitive' as const } },
            { city: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [rows, total] = await Promise.all([
      prisma.accommodation.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          id: true,
          title: true,
          country: true,
          countryCode: true,
          city: true,
          amenities: true,
          policies: true,
          tag: true,
          hotel: { select: { id: true } },
          house: { select: { id: true } },
        },
      }),
      prisma.accommodation.count({ where }),
    ]);

    const data = rows.map((accommodation) => ({
      id: accommodation.id,
      tag: accommodation.tag,
      title: accommodation.title,
      country: accommodation.country,
      countryCode: accommodation.countryCode,
      city: accommodation.city,
      policies: JSON.parse(JSON.stringify(accommodation.policies)),
      amenities: JSON.parse(JSON.stringify(accommodation.amenities)),
      type: (accommodation.house ? 'HOUSE' : 'HOTEL') as AccommodationType,
    })) as AccommodationColumns[];

    return { data, total };
  } catch {
    throw new Error(ACCOMMODATION_ERRORS.GET_LIST_FAILED);
  }
};

export const getAccommodation = async (id: string): Promise<AccommodationDetails> => {
  try {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id },
      include: {
        tag: true,
        destination: true,
        house: {
          include: {
            currency: true,
          },
        },
        hotel: {
          include: {
            rooms: {
              include: {
                currency: true,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });

    if (!accommodation) throw new Error(ACCOMMODATION_ERRORS.NOT_FOUND);
    return accommodation as unknown as AccommodationDetails;
  } catch (error) {
    if (error instanceof Error && error.message === ACCOMMODATION_ERRORS.NOT_FOUND) throw error;
    throw new Error(ACCOMMODATION_ERRORS.GET_FAILED);
  }
};
