'use server';

import { headers } from 'next/headers';
import { prisma, type Prisma } from '@repo/database';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import type {
  GetAccommodationsParams,
  GetAccommodationsResponse,
} from '@/features/accommodation/types/accommodations';
import type { Accommodation } from '@/features/accommodation/types/accommodation';

export async function getAccommodations(
  params: GetAccommodationsParams,
): Promise<GetAccommodationsResponse> {
  const headersList = await headers();
  const city = headersList.get('x-vercel-ip-city') ?? 'Paris';
  const skip = Number(params.skip) || 0;
  const take = Number(params.take) || 9;
  const where: Prisma.AccommodationWhereInput = {
    city: {
      equals: city,
      mode: 'insensitive',
    },
  };

  try {
    const [accommodations, totalCount] = await Promise.all([
      prisma.accommodation.findMany({
        take,
        skip,
        where,
        select: {
          id: true,
          title: true,
          city: true,
          amenities: true,
          house: {
            select: {
              price: true,
              discount: true,
              currency: {
                select: {
                  symbol: true,
                },
              },
            },
          },
          hotel: {
            select: {
              rooms: {
                select: {
                  price: true,
                  discount: true,
                  currency: {
                    select: {
                      symbol: true,
                    },
                  },
                },
                orderBy: {
                  price: 'asc',
                },
                take: 1,
              },
            },
          },
        },
      }),
      prisma.accommodation.count({ where }),
    ]);

    const data = accommodations.map((accommodation) => ({
      id: accommodation.id,
      title: accommodation.title,
      city: accommodation.city,
      amenities: Array.isArray(accommodation.amenities) ? accommodation.amenities.slice(0, 3) : [],
      currencySymbol:
        accommodation.house?.currency.symbol ??
        accommodation.hotel?.rooms[0]?.currency.symbol ??
        null,
      discount: accommodation.house?.discount ?? accommodation.hotel?.rooms[0]?.discount ?? null,
      price: accommodation.house?.price ?? accommodation.hotel?.rooms[0]?.price ?? null,
    }));

    return {
      city,
      totalCount,
      accommodations: data as Accommodation[],
      totalPages: Math.ceil(totalCount / take),
    };
  } catch {
    throw new Error(ACCOMMODATION_ERRORS.GET_LIST_FAILED);
  }
}
