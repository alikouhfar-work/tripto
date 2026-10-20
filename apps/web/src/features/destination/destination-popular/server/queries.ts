'use server';

import { prisma } from '@repo/database';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import type {
  GetDestinationPopularResponse,
  RawDestinationPopularResult,
} from '@/features/destination/destination-popular/types/destinationPopular';

export async function getDestinationPopular(): GetDestinationPopularResponse {
  try {
    const result = await prisma.$queryRaw`
      WITH all_prices AS (
        SELECT
          a.id AS accommodation_id,
          a.title AS accommodation_title,
          a."favoriteCount" AS favorite_count,
          h.price,
          c.symbol AS currency_symbol,
          a.country,
          a.city
        FROM "Accommodation" a
               JOIN "House" h ON h."accommodationId" = a.id
               JOIN "Currency" c ON c.id = h."currencyId"

        UNION ALL

        SELECT
          a.id AS accommodation_id,
          a.title AS accommodation_title,
          a."favoriteCount" AS favorite_count,
          r.price,
          c.symbol AS currency_symbol,
          a.country,
          a.city
        FROM "Accommodation" a
               JOIN "Hotel" ht ON ht."accommodationId" = a.id
               JOIN "Room" r ON r."hotelId" = ht.id
               JOIN "Currency" c ON c.id = r."currencyId"
      ),
           ranked AS (
             SELECT
               *,
               ROW_NUMBER() OVER (
        PARTITION BY accommodation_id
        ORDER BY price
      ) AS price_rank
             FROM all_prices
           )
      SELECT
        accommodation_id,
        accommodation_title,
        country,
        city,
        price,
        currency_symbol,
        favorite_count
      FROM ranked
      WHERE price_rank = 1
      ORDER BY favorite_count DESC, RANDOM()
        LIMIT 16;
    `;

    return (result as RawDestinationPopularResult[]).map((item) => ({
      accommodationId: item.accommodation_id as unknown as string,
      accommodationTitle: item.accommodation_title as unknown as string,
      country: item.country,
      city: item.city,
      price: item.price,
      currencySymbol: item.currency_symbol,
    }));
  } catch {
    throw new Error(DESTINATION_ERRORS.GET_LIST_FAILED);
  }
}
